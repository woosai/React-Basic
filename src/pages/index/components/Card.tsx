import { CardDTO } from "../types/card";
import styles from "./Card.module.scss";

interface Props {
  data: CardDTO;
  handleDialog: (eventValue: boolean) => void;
  handleSetCardData: (eventValue: CardDTO) => void;
}

function Card({ data, handleDialog, handleSetCardData }: Props) {
  const openDialog = () => {
    console.log(data.description);
    // console.log("width = " + data.width);
    handleDialog(true);
    handleSetCardData(data);
  };

  return (
    <div className={styles.card} onClick={openDialog}>
      <img
        src={data.urls.small}
        alt={data.alt_description}
        className={styles.card__image}
      />
    </div>
  );
}

export default Card;
