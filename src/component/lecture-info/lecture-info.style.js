import styled from 'styled-components'
const colorList = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  // "#f1c40f",
  "#e67e22",
  "#e74c3c",
  // "#ecf0f1",
  "#95a5a6",
  "#f39c12",
  "#d35400",
  "#c0392b",
  // "#bdc3c7",
  "#7f8c8d"
].sort((a, b) => Math.random() - 0.5)

export const StyledLectureInfo = styled.div`
  width: 220px;
  padding: 6px;
  margin-right: 6px;
  margin-bottom: 6px;
  background-color: ${({ sectionOrder }) => colorList[sectionOrder]}
`
