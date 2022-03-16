import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as rankingActions } from "../redux/modules/ranking";
import TabMenu from "../components/TabMenu";
import RankingTop from "../components/RankingTop";
import RankingOther from "../components/RankingOther";

const Ranking = () => {
  const tab_list = [
    {
      title: "total",
      value: "종합 랭킹",
    },
    {
      title: "month",
      value: "월간 랭킹",
    },
    {
      title: "week",
      value: "주간 랭킹",
    },
  ];
  const dispatch = useDispatch();
  let total_list = useSelector((state) => state.ranking.total_list);
  const month_list = useSelector((state) => state.ranking.month_list);
  const week_list = useSelector((state) => state.ranking.week_list);
  const [tabList, setTabList] = React.useState();

  const cur_list = () => {
    switch (tabList) {
      case "month":
        return month_list.concat([{ total: "month" }]);
        break;
      case "week":
        return week_list.concat([{ total: "week" }]);
        break;
      default:
        return total_list.concat([{ total: "total" }]);
        break;
    }
  };
  console.log(cur_list());
  React.useEffect(() => {
    dispatch(rankingActions.totalRankingDB());
    dispatch(rankingActions.monthRankingDB());
    dispatch(rankingActions.weekRankingDB());
  }, []);

  return (
    <SC_Detail>
      <h2>랭킹</h2>
      <TabMenu tab_list={tab_list} tab={setTabList} />
      <RankingTop list={cur_list().slice(0, 3)} />
      <RankingOther list={cur_list().slice(3, 10)} />
    </SC_Detail>
  );
};
const SC_Detail = styled.div`
  h2 {
    font-size: 24px;
    padding-bottom: 40px;
  }

  max-width: 1440px;
  margin: 0 auto;
`;
export default Ranking;
