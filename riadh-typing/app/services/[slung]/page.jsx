import EnquiryForm from '../../components/EnquiryForm';
import services from '../../data/services';
import { rawServices } from '../../data/services';

export default async function ServiceDetail({ params }) {
  const { slung } = await params;
  
  // Handle case where slung is undefined or null
  if (!slung || typeof slung !== 'string') {
    return (
      <section className="section pt-32 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Service Details</h1>
        <p className="text-slate-600 mb-6">
          We provide professional assistance for various services.  
          Contact us for eligibility, required documents and processing time.
        </p>
        <EnquiryForm preSelectedServices={[]} />
      </section>
    );
  }

  // Find the actual service from the services data
  // Check both category slugs and item slugs
  let service = services.find(s => s.slug === slung);
  let serviceItem = null;
  
  if (!service) {
    // Check if it's an item slug
    for (const category of rawServices) {
      serviceItem = category.items.find(item => {
        const itemSlug = item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return itemSlug === slung;
      });
      
      if (serviceItem) {
        break;
      }
    }
  }
  
  if (service) {
    return (
      <section className="section pt-32 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">{service.title}</h1>

        <p className="text-slate-600 mb-6">
          We provide professional assistance for {service.title}.  
          Contact us for eligibility, required documents and processing time.
        </p>

        <EnquiryForm preSelectedServices={[service.title]} />
      </section>
    );
  } else if (serviceItem) {
    return (
      <section className="section pt-32 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">{serviceItem}</h1>

        <p className="text-slate-600 mb-6">
          We provide professional assistance for {serviceItem}.  
          Contact us for eligibility, required documents and processing time.
        </p>

        <EnquiryForm preSelectedServices={[serviceItem]} />
      </section>
    );
  }

  // If service not found, still show the page with enquiry form
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
