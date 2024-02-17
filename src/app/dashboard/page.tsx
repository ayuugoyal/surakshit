import Link from "next/link";
import { getUser } from "@/actions/auth";
import { Profile } from "@/components/Profile";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportForn from "@/components/ReportForn";
import { get_reported_urls, get_user_reported_urls } from "@/actions/report";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Page() {
  const user = await getUser();
  console.log(user);
  if (!user) {
    redirect("/sign-in");
  }
  const getAllUrls = await get_reported_urls();
  const getMyReportedUrls = await get_user_reported_urls({ user_id: user.id });
  console.log(getMyReportedUrls);
  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
            href="/"
          >
            <FrameIcon className="w-6 h-6" />
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
            <ReportForn userId={user.id} />
          </div>
          <Tabs
            defaultValue="allurls"
            className=" flex justify-center flex-col w-full max-w-6xl mx-auto gap-5"
          >
            <TabsList>
              <TabsTrigger value="allurls" className={"w-1/2"}>
                All Reported Urls
              </TabsTrigger>
              <TabsTrigger value="myurls" className={"w-1/2"}>
                My Reported Urls
              </TabsTrigger>
            </TabsList>
            <TabsContent value="allurls">
              <Table>
                <TableCaption>A list of all reported urls.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reported Url</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getAllUrls.map((url, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{url.url}</TableCell>
                      <TableCell>{url.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="myurls">
              <Table>
                <TableCaption>A list of all my reported urls.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reported Url</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getMyReportedUrls.map((url, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{url.url}</TableCell>
                      <TableCell>{url.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
