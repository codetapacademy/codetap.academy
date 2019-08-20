import styled from 'styled-components'

const defaultImage = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjA4IDExNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjA4IDExNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiNGRkZGRkY7fS5zdDF7ZmlsbDojOTk5OTk5O308L3N0eWxlPjxnPjxyZWN0IHg9IjUiIHk9IjUiIGNsYXNzPSJzdDAiIHdpZHRoPSIxOTgiIGhlaWdodD0iMTA3Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTE5OCwxMHY5N0gxMFYxMEgxOTggTTIwOCwwSDB2MTE3aDIwOFYwTDIwOCwweiIvPjwvZz48cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjEwLDEwNyA2Niw2MCAxMTgsMTA3IDE1OCw0MyAxOTgsMTA3ICIvPjxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjEwOSIgY3k9IjQ4IiByPSIyNSIvPjwvc3ZnPg=='


export const StyledThumbnail = styled.div`
  width: 100%;
  padding-top: ${({ ratio }) => ratio}%;
  background-image: url(${({ imagePath }) => imagePath || defaultImage});
  background-size: cover;
  background-position: center center;
  position: relative;
  overflow: hidden;

  &:before {
    content: 'Free';
    position: absolute;
    top: 3px;
    right: -26px;
    background: linear-gradient(to bottom, #a90329 0%,#d52027 39%,#6d0019 100%);
    transform: rotate(45deg);
    padding: 5px 10px;
    width: 70px;
    text-align: center;
  }
`
