// [IMPORTS]
import React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import "../../Styles/Utils.scss";

// [INTERFACES]
/* MAIN */ interface IRowElemProps {
  /**
   * Array of IColumnElement objects
   */
  columns: IRowElem_ColumnMemberProps[];
  /**
   * Custom styling for RowElem
   */
  styling?: IRowElem_StylingProps;
  /**
   * onClick event callback
   */
  onClick?: (e: any) => any;
}
/* SUB */ interface IRowElem_ColumnMemberProps {
  /**
   * Column name -> routes to classname
   */
  name: string;
  /**
   * Element to populate the column
   */
  elem: any;
}
/* SUB */ interface IRowElem_StylingProps {
  /**
   * GridTemplateColumns applied (size of each column in order) to RowElem
   * @default 'repeat(auto)'
   */
  gridTemplateColumns: string;
  /**
   * Background color of RowElem
   * @default 'inherit'
   */
  backgroundColor: string;
  /**
   * Height of the RowElem
   */
  height: string;
}

// [STYLED]
const StyledRowElem = styled.div<IRowElem_StylingProps>`
  width: 100%;
  max-width: 100%;
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  display: grid;
  box-sizing: border-box;
  grid-template-rows: 100%;
  grid-template-columns: ${(props) => props.gridTemplateColumns};
  grid-column-gap: 20px;
  cursor: pointer;

  .thread-element-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .thread-element {
      overflow: hidden;

      font-size: 20px;
      color: black;
    }
  }

  &:hover {
    transform: scale(1.01);
    opacity: 0.9;
  }

  &:active {
    box-shadow: none;
    transform: translateY(-2px);
  }
`;

// [COMPONENTS]
const RowElem = (props: IRowElemProps) => {
  // (Props) Object destructuring -> Assigning default values when using '='
  const { columns = [], styling, onClick = () => null } = props;

  // (Styling prop) -> Object destructuring the styling object
  const {
    gridTemplateColumns = `${columns.map((col) => "auto").join(" ")}`,
    backgroundColor = "inherit",
    height = "100%",
  } = styling || {};

  /**
   * Rendering the component (runtime) -> Everything before that is 'runtime' and done before a rendering
   * - We are using columns.map to take all objects in the 'columns' array and returning JSX <div/>
   * elements from them
   */
  return (
    <div
      className="row-elem"
      style={{ gridTemplateColumns, backgroundColor, height }}
      onClick={(e) => onClick(e)}
    >
      {columns.map((elem: IRowElem_ColumnMemberProps) => (
        /* key=uuid() -> Because React requires a key attributes when generating elements through array mapping*/
        <div key={uuid()} className={`column-element-element ${elem.name}`}>
          <div className={`column-element ${elem.name}`}>{name}</div>
        </div>
      ))}
    </div>
  );
};

// [EXPORTS]
export default RowElem;
