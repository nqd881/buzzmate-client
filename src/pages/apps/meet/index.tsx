import {AppPageWithAppbarLayout} from "@components/shared/AppPageWithAppbarLayout";
import {NextPageWithLayout} from "@type";

type MeetPageProps = {
  initialData: any;
};

const MeetPage: NextPageWithLayout<MeetPageProps> = ({initialData}) => {
  return <div>Meet Page</div>;
};

MeetPage.getLayout = AppPageWithAppbarLayout;

export default MeetPage;
