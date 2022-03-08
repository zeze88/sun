import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as rankingActions } from "../redux/modules/ranking";

const Ranking = () => {
  const dispatch = useDispatch();
  const total_list = useSelector((state) => state.ranking.total_list);
  const month_list = useSelector((state) => state.ranking.month_list);
  const week_list = useSelector((state) => state.ranking.week_list);
  console.log("total", total_list, "mon", month_list, "week", week_list);

  React.useEffect(() => {
    dispatch(rankingActions.totalRankingDB());
    dispatch(rankingActions.monthRankingDB());
    dispatch(rankingActions.weekRankingDB());
  }, []);
  return <div></div>;
};

export default Ranking;
