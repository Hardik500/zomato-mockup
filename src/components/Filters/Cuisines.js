import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-top: 1rem;
  }
`;

const FilterProp = styled.div`
  border: 1px solid ${props => props.isActive ? 'rgb(236, 70, 84)' : 'rgb(207, 207, 207)'};
  color: ${props => props.isActive ? 'rgb(236, 70, 84)' : 'rgb(156, 156, 156)'};
  box-shadow: rgb(54 54 54 / 6%) 0px 1px 2px;
  border-radius: 0.4rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
  font-size: 1rem;
  transition: all 0.5s;

  &:hover {
    background-color: rgb(248, 248, 248);
  }
`;

const FilterName = styled.div`
`

export default function Cuisines({ cuisine, toggleCuisines, isActive }) {
    return (
        <Container>
            <FilterProp isActive={isActive} onClick={() => toggleCuisines(cuisine)}>
                <FilterName>
                    {cuisine}
                </FilterName>
            </FilterProp>
        </Container>);
}
