
interface Inputboxtype{
  id: string,
  label: string,
  placeholder?: string,
  type?: string,
  value: string | undefined,
  setValue: React.Dispatch<React.SetStateAction<string>>
}

function Inputbox({id="1", label, placeholder="", type="text", value, setValue}: Inputboxtype) {
  return (
    <div className="">
      <label htmlFor={id} className="font-semibold block pb-1">{label}</label>
      <input value={value} onChange={(e) => setValue(e.target.value)} id={id} type={type} placeholder={placeholder} className="w-full px-2 py-2 rounded border border-gray-300"/>
    </div>
  )
}

export default Inputbox
