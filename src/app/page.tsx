import ShowcaseProject from "@/components/Showcase";

export default function Home() {
  return (
    <>
      <section className="w-full py-16 md:py-24 lg:py-32 xl:py-48 flex flex-col gap-20 bg-gradient-to-b ">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Welcome to Surakshit
            </h1>
            <p className="mx-auto max-w-[700px] mt-4 text-lg">
              Safeguarding Your Online Odyssey - Unmasking Malicious URLs,
              Empowering Secure Surfing.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 sm:px-44 md:grid-cols-2 lg:grid-cols-3">
            <ShowcaseProject description="From ransomware attacks to phishing scams, cybersecurity serves as a critical shield, protecting businesses and individuals alike from the devastating consequences of cybercrime." />
            <ShowcaseProject description="In an interconnected world, cybersecurity stands as the first line of defense, safeguarding our digital identities, personal information, and sensitive data from malicious actors." />
            <ShowcaseProject description="As technology evolves, so do cyber threats. Embracing a proactive cybersecurity mindset is essential to stay ahead of adversaries and mitigate potential risks to our digital infrastructure" />
          </div>
        </div>
      </section>
    </>
  );
}
