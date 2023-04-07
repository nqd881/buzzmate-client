import {AppPageWithAppbarLayout} from "@components/shared/AppPageWithAppbarLayout";
import {NextPageWithLayout} from "@type";

type TaskPageProps = {
  initialData: any;
};

const TaskPage: NextPageWithLayout<TaskPageProps> = ({initialData}) => {
  return <div>Task Page</div>;
};

TaskPage.getLayout = AppPageWithAppbarLayout;

export default TaskPage;
