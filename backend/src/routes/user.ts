import { signinInput, signupInput } from "@parik100x/medium-common-app";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { sign, verify } from "hono/jwt";
import { TOKEN } from "./constants";
import { JWTPayload } from "hono/utils/jwt/types";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

interface UserPayload extends JWTPayload {
  id: string;
}

userRouter.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    if (!prisma) {
      throw new Error("Error initialising prisma");
    }

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
      throw new Error("Invalid inputs");
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (findUser) {
      throw new Error("User with same email already exist");
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    if (!user) {
      throw new Error("Unknown error while creating user");
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none" as "none",
    };
    c.status(200);
    setCookie(c, TOKEN, jwt, options);
    return c.json({
      message: "Account creation successful",
    });
  } catch (error: any) {
    console.error(error);
    c.status(403);
    return c.json({
      error: error.message,
    });
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    if (!prisma) {
      throw new Error("Error while initilaisin");
    }
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      throw new Error("Invalid inputs");
    }
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
    if (!user) {
      throw new Error("User not found, Invalid email/password combination");
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none" as "none",
    };
    c.status(200);
    setCookie(c, TOKEN, jwt, options);
    return c.json({
      message: "Login Successful",
    });
  } catch (error: any) {
    console.error(error);
    c.status(403);
    return c.json({
      error: error.message,
    });
  }
});

userRouter.get("/info", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    if (!prisma) {
      throw new Error("Error while initilaisin");
    }
    const token = getCookie(c, TOKEN);
    if (!token) {
      throw new Error("No token found in authorization header");
    }
    const user = (await verify(token, c.env.JWT_SECRET)) as UserPayload;

    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        name: true,
        password: false,
      },
    });

    return c.json(userData);
  } catch (error: any) {
    console.error(error);
    c.status(403);
    return c.json({
      error: error.message,
    });
  }
});
