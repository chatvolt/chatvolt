import FlashAutoIcon from '@mui/icons-material/FlashAuto';
import Button from '@mui/joy/Button';
import Link from 'next/link';

import FeedbackCard from '@app/components/FeedbackCard';

function InfoPaymentSuccessfull() {

  function Cta() {
    return (
      <Link href="/settings/billing">
        <Button>Go to Dashboard</Button>
      </Link>
    );
  }

  return (
    <FeedbackCard
      Icon={<FlashAutoIcon />}
      header={'Payment Successfull !'}
      description={
        'Thank you for subscribing! Your payment has been successfully processed.'
      }
      Cta={<Cta />}
    />
  );
}
export default InfoPaymentSuccessfull;
