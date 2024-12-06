"use client"
export function NewButton({label , onClick} : any) {
  return (
    <div className="flex gap-4 items-center">
    <button onClick={onClick} type="button" className="focus:outline-none text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">{label}</button>
  </div>
  )
}
