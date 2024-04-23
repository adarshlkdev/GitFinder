"use client"
import { ModeToggle } from "@/components/ModeToggler";
import { useTheme } from "next-themes";
import Search from "@/components/Search";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image"
import Link from "next/link"
import { LocateFixedIcon  , Link2Icon , LinkedinIcon , GithubIcon , Building2Icon, TwitterIcon} from "lucide-react"
import dateFormat, { masks } from "dateformat";
import { useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type GithubUser = {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string;
  created_at: string;
  email: string | null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean | null;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string | null;
  type: string;
  updated_at: string;
  url: string;
  message : string
  documentation_url : string
}

export default function Dashboard() {
  const [userName , setUserName] = useState('adarshlkdev');
  const { isPending, error, data  , refetch} = useQuery<GithubUser>({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`https://api.github.com/users/${userName}`).then((res) =>
        res.json(),
      ),
  });


  if (isPending) 
  return (
       <div className="flex h-screen w-full items-center justify-center">
        <p className="animate-bounce">Loading...</p>
       </div>
    )

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){

    e.preventDefault();
    refetch();

  }


  return (
    <div className="min-h-screen dark:bg-black bg-stone-200 dark:bg-dot-white/[0.2] bg-dot-black/[0.4] relative flex items-center justify-center w-full p-1.5 pt-10 transition-all sm:p-4 sm:pt-12">
     {/* Container */}
     <div className="mx-auto flex w-full bg-slate-700 max-w-[600px] max-md:w-[400px] my-10 flex-col gap-8 rounded-md p-2 border shadow-md">
      <section className="flex justify-between gap-3">
        <Link href="/">
       <p className="text-xl font-semibold text-white">Gitfinder</p>
       </Link>
       <div className="flex flex-row justify-center items-center gap-2">
       <p className="text-sm text-white"></p>
       <ModeToggle />
       </div>
      </section>

       <Search
        onChange={(e) => setUserName(e.target.value)} 
        onSubmit={handleSubmit} 
        value={userName}
         />
      {data?.message ? (
      <div className="flex w-full flex-col gap-5 rounded-lg bg-white px-4 py-8 text-center text-red-500 dark:bg-slate-800">
        User not found
      </div>) : (

       <div className="flex w-full flex-col gap-5 rounded-lg bg-slate-300 dark:bg-slate-800 px-4 py-8 min-h-[200px]">
      <section className="flex gap-4 ">
        {/*user image */}

        <Image 
        width={200}
        height={200}
        className="h-20 w-20 rounded-full"
        src={data?.avatar_url ?? ''}
        alt="image" />

        <section className="flex flex-col justify-between transition-all gap-1 sm:w-full sm:flex-row">
            <div>
                {/*name*/}
                <h1>{data?.name}</h1>
                {/*user id*/}
                <Link target="_blank" className="text-fuchsia-500 font-medium" href={`https://github.com/${data?.login}/`}>@{data?.login}</Link>
            </div>
        
          {/* Joined date*/}
          <p className="">
            <span>Joined </span>
            <span>{dateFormat(data?.created_at ,'dd mmm yyyy')}</span>
          </p>
        </section>
      </section>
      <section className="flex flex-col gap-5">
         <p>{data?.bio ?? (
              <span>This profile has nothing to show.</span>
         )}</p>
         {/* repo & follower section*/}
         <div className="flex justify-between gap-3 rounded-lg bg-stone-100 px-6 py-4 dark:bg-slate-900 min-h-[50px]">
            {/*item 1*/}
           <div className="flex flex-col items-center gap-2">
            <p className="text-sx opacity-60">Repos</p>
            <p className="text-sm font-bold sm:text-base">{data?.public_repos}</p>
           </div>

             {/*item 2*/}
             <div className="flex flex-col items-center gap-2">
            <p className="text-sx opacity-60">Followers</p>
            <p className="text-sm font-bold sm:text-base">{data?.followers}</p>
           </div>

             {/*item 3*/}
             <div className="flex flex-col items-center gap-2">
            <p className="text-sx opacity-60">Following</p>
            <p className="text-sm font-bold sm:text-base">{data?.following}</p>
           </div>
         </div>
         {/* extra links*/}
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex gap-2">
              <LocateFixedIcon className=""/>
              <p>{data?.location ?? (
                 <span className="opacity-60">Not available</span>
              )}</p>
            </div>
         </div>

         {/* 2*/}
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex gap-2">
            <TwitterIcon className=""/>
              <Link href={`https://twitter.com/${data?.twitter_username}`}>{data?.twitter_username?? (
                 <span className="opacity-60">Not available</span>
              )}</Link>
            </div>
         </div>

      </section>
     </div>
      )}
    </div>
    </div>

  );
}
