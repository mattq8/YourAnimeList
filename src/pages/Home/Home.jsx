import Header from "../../components/Header/Header";
import Content from "../../components/Content/Content";

export default function Home() {
  return (
    <>
        <Header title="Home" search={true}/>
        <Content />
    </>
  );
}