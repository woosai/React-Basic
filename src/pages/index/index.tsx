import { useRecoilValueLoadable } from "recoil";
import { useMemo, useState } from "react";
import { imageData } from "@/store/selectors/imageSelectors";
import CommonHeader from "@/components/common/header/CommonHeader";
import CommonSearchBar from "@/components/common/searchBar/CommonSearchBar";
import CommonNav from "@/components/common/navigation/CommonNav";
import CommonFooter from "@/components/common/footer/CommonFooter";
import { CardDTO } from "./types/card";
import Card from "./components/Card";
import DetailDialog from "@/components/common/dialog/DetailDialog";

// CSS
import styles from "./styles/index.module.scss";

function Index() {
  const imageSelector = useRecoilValueLoadable(imageData);
  const [open, setOpen] = useState<boolean>(false); // 이미지 상세 다이얼로그 발생(관리) State
  const [selectCard, setSelectCard] = useState<CardDTO>();

  const Card_List = useMemo(() => {
    //console.log(imageSelector);
    if (imageSelector.state == "hasValue") {
      const result = imageSelector.contents.map((card: CardDTO) => {
        return (
          <Card
            data={card}
            key={card.id}
            handleDialog={setOpen}
            handleSetCardData={setSelectCard}
          />
        );
      });

      return result;
    } else {
      return <div>loading...</div>;
    }
  }, [imageSelector]);

  return (
    <div className={styles.page}>
      {/* 공통 헤더 UI 부분 */}
      <CommonHeader />
      {/* 공통 네비게이션 UI 부분 */}
      <CommonNav />
      <div className={styles.page__contents}>
        <div className={styles.page__contents__introBox}>
          <div className={styles.wrapper}>
            <span className={styles.wrapper__title}>PhotoSplash</span>
            <span className={styles.wrapper__desc}>
              인터넷의 시각 자료 출처입니다. <br />
              모든 지역에 있는 크리에이터들의 지원을 받습니다.
            </span>
            {/* 검색창 UI 부분 */}
            <CommonSearchBar />
          </div>
        </div>
        <div className={styles.page__contents__imageBox}>{Card_List}</div>
      </div>
      {/* 공통 푸터 UI 부분 */}
      <CommonFooter />
      {open && <DetailDialog data={selectCard} handleDialog={setOpen} />}
    </div>
  );
}

export default Index;
