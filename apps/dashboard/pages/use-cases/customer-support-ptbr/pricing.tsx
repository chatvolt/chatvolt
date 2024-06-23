import { Header } from '@app/components/cs-landing-page-ptbr/Header';
import { Footer } from '@app/components/landing-page-ptbr/Footer';
import PricingSection from '@app/components/landing-page-ptbr/PricingSection';
import PartnerLogos from '@app/components/PartnerLogos';
import SEO from '@app/components/SEO';

export default function CSPricingPage() {
  return (
    <>
      <SEO
        title="Planos para negócios de todos os tamanhos"
        description="Escolha um plano acessível com o Chatvolt. Nossas ofertas incluem os níveis Discover, Growth, Pro e Enterprise, cada um repleto de recursos para envolver seu público, criar fidelidade do cliente e impulsionar as vendas. Plano gratuito incluído!"
        uri={'/pricing'}
      />
      <Header />
      <main className="flex flex-col min-h-full mb-auto bg-black">
        <PricingSection />

        {/*<PartnerLogos />*/}
      </main>
      <Footer disableProductColumn />
    </>
  );
}
