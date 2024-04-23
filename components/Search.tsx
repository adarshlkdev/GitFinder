import { SearchIcon } from "lucide-react"
type Props = {
    value:string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}
export default function Search(props : Props){
    return(
        <form onSubmit={props.onSubmit} className="flex items-center gap-2 w-ful p-2 rounded-lg">
            <section className="flex py-4 items-center w-full h-full gap-2">
                <SearchIcon className="" size={30}/>
                <input className="w-full py-3 rounded-lg pl-2" 
                type="text"
                placeholder="Search Github username.." 
                value={props.value}
                onChange={props.onChange}/>
            </section>
            <button className="rounded-lg text-md px-5 py-3 bg-indigo-600 text-white dark:bg-fuchsia-500 text-bold">Search</button>
        </form>
    )
}
