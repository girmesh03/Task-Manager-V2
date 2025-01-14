import { useOutletContext } from "react-router";

const Tasks = () => {
  const { searchText, selectedDate } = useOutletContext();

  console.log("tasks searchText", searchText);
  console.log("tasks selectedDate", selectedDate);
  return <div>Tasks</div>;
};

export default Tasks;
