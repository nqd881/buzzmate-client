import {AppPageWithAppbarLayout} from "@components/shared/AppPageWithAppbarLayout";
import {NextPageWithLayout} from "@type";

type HomePageProps = {
  initialData: any;
};

const HomePage: NextPageWithLayout<HomePageProps> = ({initialData}) => {
  return <div>Home Page</div>;
};

HomePage.getLayout = AppPageWithAppbarLayout;

export default HomePage;
