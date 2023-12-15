"use client";
import { Step } from "../../../../next-type-d";
import style from "./Workflow.module.css";
import {
  MdPlayArrow,
} from "react-icons/md";
import WorkflowItem from "./WorkflowItem";

type Props = {
  steps: Step[];
};

const Workflow = ({ steps }: Props) => {
  return (
    <>
      <div className="p-8 flex flex-col lg:!flex-row lg:justify-center lg:items-baseline lg:gap-5">
        {/* Start Step ********* */}

        <div
          id="step"
          className={`flex mt-6 gap-6 justify-center lg:flex-col ${style.succeedItem}`}
        >
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <div className={`${style.dimond}`}>
              <span className="uppercase text-xs font-bold">start</span>
              <div className={style.topLeft}></div>
              <div className={style.topRight}></div>
              <div className={style.bottomLeft}></div>
              <div className={style.bottomRight}></div>
            </div>
            <div
              className={`w-1 h-20 bg-black lg:w-20 lg:h-1 ${style.line}`}
            ></div>
          </div>
          <div className="content w-[80px]">
            <p className="text-gray-900 uppercase">start</p>
            <span
              className={`capitalize text-sm mt-1 font-bold flex items-center gap-1 ${style.status}`}
            >
              <MdPlayArrow />
              start
            </span>
            <p className="text-gray-500 text-xs my-1">Lorem ipsum dolor.</p>
          </div>
        </div>

        {/* All Steps Except Start Step ********* */}

        {/* All Steps Except Start Step ***** */}
        {steps.map((step: Step) => (
          <WorkflowItem key={step.step} step={step} />
        ))}
      </div>
    </>
  );
};

export default Workflow;

{
  //   const [file, setFile] = useState<File | null>(null);
  //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setFile(event.target.files![0]);
  //   };
  /* <label className={` ${style.input}`}>
              <input type="file" onChange={handleFileChange} />
              Upload
            </label> */
}