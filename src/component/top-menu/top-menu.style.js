import styled from 'styled-components'

export const StyledTopMenu = styled.div`
  height: 64px;
  border-bottom: 2px solid #3D465E;
  background-color: ${({ theme }) => theme.menu.background};
  padding: 0 ${({ theme }) => theme.layout.bigPadding};
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.5rem;
  grid-auto-flow: column;
  align-items: center;
  /* position: fixed; */
  top: 0;
  width: 100%;
`
