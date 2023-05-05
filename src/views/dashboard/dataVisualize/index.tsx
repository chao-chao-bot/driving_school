import Pie from "./components/pie";
import Curve from "./components/curve";
import "./index.less";
import BookSum from "./images/book-sum.png";
import AddPerson from "./images/add_person.png";
import AddTeam from "./images/add_team.png";
import Today from "./images/today.png";
import BookSum1 from "./images/book_sum.png";
import { useCoach } from "@/utils/hooks/coach";
import { useStudent } from "@/utils/hooks/student";
import { useExamRecord } from "@/views/exam/record/util/useExamRecord";
import { useExam } from "@/utils/hooks/exam";
import { useCourse } from "@/utils/hooks/course";

const DataVisualize = () => {
	const { data: coachList } = useCoach();
	const { data: studentList } = useStudent();
	const { data: recordList } = useExamRecord();
	const { data: examList } = useExam();
	const { data: courseList } = useCourse();
	console.log("recordList====", recordList);

	return (
		<div className="dataVisualize-box">
			<div className=" card top-box">
				<div className="top-title">数据可视化</div>
				<div className="top-content">
					<div className="item-left sle">
						<span className="left-title">考试通过总数</span>
						<div className="img-box">
							<img src={BookSum} alt="" />
						</div>
						<span className="left-number">{recordList?.filter(item => item.pass).length || 0}</span>
					</div>
					<div className="item-center">
						<div className="gitee-traffic traffic-box">
							<div className="traffic-img">
								<img src={AddPerson} alt="" />
							</div>
							<span className="item-value">{studentList?.length || 0}</span>
							<span className="traffic-name sle">学员总数</span>
						</div>
						<div className="gitHub-traffic traffic-box">
							<div className="traffic-img">
								<img src={AddTeam} alt="" />
							</div>
							<span className="item-value">{coachList?.length || 0}</span>
							<span className="traffic-name sle">教练总数</span>
						</div>
						<div className="today-traffic traffic-box">
							<div className="traffic-img">
								<img src={Today} alt="" />
							</div>
							<span className="item-value">{courseList?.length || 0}</span>
							<span className="traffic-name sle">上课次数</span>
						</div>
						<div className="yesterday-traffic traffic-box">
							<div className="traffic-img">
								<img src={BookSum1} alt="" />
							</div>
							<span className="item-value">{examList?.length || 0}</span>
							<span className="traffic-name sle">考试总次数</span>
						</div>
					</div>
					<div className="item-right">
						<div className="echarts-title">考试通过 / 未通过占比</div>
						<div className="book-echarts">
							<Pie
								failSum={recordList?.filter(item => !item.pass).length || 0}
								passSum={recordList?.filter(item => item.pass).length || 0}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DataVisualize;
