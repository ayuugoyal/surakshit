import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUser } from "@/actions/auth";
import { Profile } from "@/components/Profile";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
            href="/"
          >
            <FrameIcon className="w-6 h-6" />
            <span className="sr-only">Event</span>
          </Link>
          <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
            <Link className="font-bold w-28" href="/dashboard">
              Listed Reported Urls
            </Link>
          </nav>
          <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <Profile userdetails={user} />
          </div>
        </header>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
          <div className="max-w-6xl w-full mx-auto flex items-center gap-4">
            <form className="flex-1">
              <Input
                className="bg-white dark:bg-gray-950"
                placeholder="Search Reported Urls..."
              />
              <Button className="sr-only" type="submit">
                Submit
              </Button>
            </form>
          </div>
          <Tabs
            defaultValue="allproject"
            className=" flex justify-center flex-col w-full max-w-6xl mx-auto gap-5"
          >
            <TabsList>
              <TabsTrigger value="allproject" className={"w-1/2"}>
                All Reported Urls
              </TabsTrigger>
              <TabsTrigger value="mentorProject" className={"w-1/2"}>
                My Reported Urls
              </TabsTrigger>
            </TabsList>
            <TabsContent value="allproject">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mx-auto">
                l
              </div>
            </TabsContent>
            <TabsContent value="mentorProject">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mx-auto">
                k
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}

function FrameIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  );
}
