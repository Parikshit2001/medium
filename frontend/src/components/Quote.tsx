interface quoteType{
  statememt: string,
  person: string,
  company: string
}

function Quote({statememt, person, company}: quoteType) {
  return (
    <div className="bg-gray-200 h-full flex">
      <div className="flex justify-center flex-col px-10 mx-10">
        <div className="pb-5">
          <h1 className="font-bold text-3xl">
            <span>"</span>{statememt}<span>"</span>
          </h1>
        </div>
        <div>
          <h2 className="font-bold">{person}</h2>
          <h3 className="text-gray-500">{company}</h3>
        </div>
      </div>
    </div>
  );
}

export default Quote;
