import {AppPageWithAppbarLayout} from "@components/shared/AppPageWithAppbarLayout";
import {NextPageWithLayout} from "@type";

type SettingPageProps = {
  initialData: any;
};

const SettingPage: NextPageWithLayout<SettingPageProps> = ({initialData}) => {
  return <div>Setting Page</div>;
};

SettingPage.getLayout = AppPageWithAppbarLayout;

export default SettingPage;
