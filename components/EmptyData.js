import { Empty } from "antd";

export default function EmptyData() {
  return (
    <div className="w-full flex justify-center">
      <Empty description={<span>No Data</span>}></Empty>
    </div>
  );
}
