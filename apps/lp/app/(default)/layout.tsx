import Footer from '@chatvolt/ui/lp/footer';
import Header from '@chatvolt/ui/lp/header';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="grow">{children}</main>

      <Footer />
    </>
  );
}
