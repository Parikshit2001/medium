import { createBlogInput, updateBlogInput } from "@parik100x/medium-common-app";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

interface UserPayload extends JWTPayload {
  id: string;
}

blogRouter.use("/*", async (c, next) => {
  try {
    const authorizationHeader = c.req.header("authorization");
    if (!authorizationHeader?.startsWith("Bearer")) {
      throw new Error("authorization Header does not starts with Bearer");
    }
    const token = await authorizationHeader?.split(" ")[1];
    if (!token) {
      throw new Error("No token found in authorization header");
    }
    const user = (await verify(token, c.env.JWT_SECRET)) as UserPayload;
    c.set("userId", user.id);
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate())
    await next();
  } catch (error: any) {
    console.error(error);
    c.status(403);
    return c.json({
      error: error.message,
    });
  }
});

blogRouter.post("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    // const prisma = c.get("prisma")
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      throw new Error("Invalid body sent in request");
    }
    const id = c.get("userId");
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: new Date(),
        authorId: id,
      },
    });
    if (!post) {
      throw new Error(
        "Unknown error occused while creating the post. DataBase might be down"
      );
    }
    return c.json({
      message: "posted successfully",
      id: post.id,
    });
  } catch (error: any) {
    console.error(error);
    c.status(403);
    return c.json({
      error: error.message,
    });
  }
});
 
blogRouter.put("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      throw new Error("Invalid request body sent");
    }
    const authorId = c.get("userId");
    const post = await prisma.post.findUnique({
      where: {
        id: body.id,
        authorId,
      },
    });
    if (!post) {
      throw new Error("No such post found");
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: body.id,
        authorId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      message: "Updated posted successfully",
      id: post.id,
    });
  } catch (error: any) {
    console.error(error);
    c.status(403);
    return c.json({
      error: error.message,
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const data = await prisma.post.findMany();
    return c.json({
      data,
    });
  } catch (error: any) {
    console.error(error);
    c.status(403);
    return c.json({
      error: error.message,
    });
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param("id");
    const blogData = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    return c.json({
      blogData
    });
  } catch (error: any) {
    console.error(error);
    c.status(403);
    return c.json({
      error: error.message,
    });
  }
});
