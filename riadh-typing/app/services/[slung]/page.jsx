import EnquiryForm from '../../components/EnquiryForm';

export default async function ServiceDetail({ params }) {
  const { slung } = await params;
  const title = slung
    .replace(/-/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());

  return (
    <section className="section pt-32 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>

      <p className="text-slate-600 mb-6">
        We provide professional assistance for {title}.  
        Contact us for eligibility, required documents and processing time.
      </p>

      <EnquiryForm preSelectedServices={[title]} />
    </section>
  );
}
