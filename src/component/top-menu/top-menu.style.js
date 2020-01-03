import styled from 'styled-components'

export const StyledDropDownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 1;
  border: 2px solid ${({ theme }) => theme.layout.borderDark};
  background-color: ${({ theme }) => theme.menu.background};
  padding: ${({ theme }) => theme.layout.bigPadding};
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  align-items: flex-end;

  & > button {
    margin-bottom: 0.5rem;
  }
`

export const StyledTopMenu = styled.div`
  height: 64px;
  border-bottom: 2px solid ${({ theme }) => theme.layout.borderDark};
  background-color: ${({ theme }) => theme.menu.background};
  padding: 0 ${({ theme }) => theme.layout.bigPadding};
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.5rem;
  grid-auto-flow: column;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
`
