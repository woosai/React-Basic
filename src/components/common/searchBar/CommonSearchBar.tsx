import { useState } from "react";
import { useRecoilState } from "recoil";
import { pageState } from "@/store/atoms/pageState";
import { searchState } from "@/store/atoms/searchState";

import styles from "./CommonSearchBar.module.scss";

function CommonSearchBar() {
  const [search, setSearch] = useRecoilState(searchState);
  const [page, setPage] = useRecoilState(pageState);
  const [searchKeyword, setSearchKeyword] = useState("");

  const onChangedInputText = (evnet) => {
    // console.log(evnet.target.value);
    setSearchKeyword(evnet.target.value);
  };

  const onSearch = () => {
    if (searchKeyword == "") {
      // 기본 설정한 값으로 검색
      setSearch("camping");
    } else {
      setSearch(searchKeyword);
    }
    setPage(1);
  };

  const activeenter = (event) => {
    if (event.key === "Enter") {
      // console.log(searchKeyword);
      onSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input
          type="text"
          placeholder="찾으실 이미지를 검색하세요."
          className={styles.searchBar__search__input}
          onChange={onChangedInputText}
          onKeyDown={activeenter}
        />
        <img src="src/assets/icons/icon-search.svg" alt="" onClick={onSearch} />
      </div>
    </div>
  );
}

export default CommonSearchBar;
