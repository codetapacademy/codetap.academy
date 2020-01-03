import styled from 'styled-components'

export const StyledTurtleListSpecial = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  padding: 1rem 0;
`

export const StyledTurtleList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

export const StyledTurtle = styled.div`
  width: 140px;
  height: 140px;
  background-image: url(${({ image }) => image});
  transition: 250ms;
  opacity: ${({ selected }) => selected ? 1 : 0.65};
  background-position-x: -${({ niceIndex }) => niceIndex * 140}px;
  position: relative;
  filter: grayscale(${({ selected }) => !selected ? '40%' : '0'});

  @media (max-width: 768px) {
    display: ${({ selected }) => selected ? 'initial' : 'none'};;
  }

  &::after {
    content: '${({ title }) => title}';
    display: block;
    text-align: center;
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    font-weight: ${({ selected }) => selected ? 'bold' : 'normal'};
  }
`

export const StyledSubscribeAmount = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.layout.bigPadding};
  font-size: 2.5rem;
`

export const StyledSubscribeSliderInfo = styled.div`
  color: ${({ theme }) => theme.layout.borderColor};
  font-size: 1.2rem;
`

export const StyledSubscribeUser = styled.span`
  color: ${({ theme }) => theme.colorList.warning};
  font-size: 1.2rem;
`

export const StyledSubscribeFeatureLabel = styled.div`
  flex-grow: 1;
`

export const StyledSubscribePlanType = styled.div`
  flex-basis: ${({ planNumber }) => (planNumber || 1) * 25}%;
  border: 1px dashed ${({ theme }) => theme.layout.text};
  display: flex;
  flex-direction: column;
`

export const StyledSubscribePlanTitle = styled.div`
  font-size: 1.2rem;
  text-align: center;
  padding: 1rem 0;
  font-weight: bold;
`

export const StyledSubscribePlanList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  grid-gap: ${({ theme }) => theme.layout.defaultPadding};
`

export const StyledSubscribeLabelWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${({ theme }) => theme.layout.defaultPadding};
`

export const StyledSubscribeFeature = styled.div`
  & > .codetap-academy-check {
    color: ${({ theme, selected }) => selected ? '#0f0' : theme.menu.other};
  }
  filter: grayscale(${({ theme, selected }) => !selected ? '100%' : '50%'});
  transition: 250ms;
  padding: ${({ theme }) => theme.layout.defaultPadding};
  flex-basis: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  border: 1px dashed ${({ theme }) => theme.menu.selected};
`

export const StyledSubscribeLabel = styled.div`
  background-color: ${({ theme, selected }) => selected ? theme.menu.selected : theme.menu.background};
  color: ${({ theme, selected }) => !selected ? theme.menu.selected : theme.menu.background};
  transition: 250ms;
  padding: ${({ theme }) => theme.layout.bigPadding};
  flex-basis: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  white-space: nowrap;
  cursor: pointer;
`

export const StyledSubscribeButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.layout.bigPadding} 0;
`

export const StyledSubscribePanel = styled.div`
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  background-color: ${({ theme }) => theme.menu.background};
  padding: ${({ theme }) => theme.layout.bigPadding};
`

export const StyledSubscribeButton = styled.button`
  background-color: ${({ bgcolor }) => bgcolor || '#d52027'};
  border: 1px solid rgba(0,0,0,0.21);
  border-bottom: 4px solid rgba(0,0,0,0.21);
  border-radius: 4px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  cursor: pointer;
`
