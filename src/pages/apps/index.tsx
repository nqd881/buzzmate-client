import {useRouter} from "next/router";
import {useEffect} from "react";

const AppsPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/apps/chat");
  }, [router]);

  return <div>Loading ...</div>;
};

export default AppsPage;
