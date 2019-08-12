import stylEd from 'styled-components'

export const StyledAvatar = stylEd.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.5rem;
  align-items: center;
`

export const StyledAvatarImage = stylEd.div`
  width: 1.8rem;
  height: 1.8rem;
  background-image: url(${({ url }) => url});
  border-radius: 50%;
  background-size: cover;
  display: inline-block
  border: 1px solid ${({ theme }) => theme.layout.borderColor}
`
