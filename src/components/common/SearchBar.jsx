import { styled } from "styled-components";

const StyledSearchBar = styled.div`
  display: inline-block;
  margin-left: 5px;
`;

const SearchBarModal = ({
  id = "search",
  name = "search",
  placeholder = "Search...",
  onChange,
}) => {
  return (
    <StyledSearchBar>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </StyledSearchBar>
  );
};

const SearchBar = ({ id, name, placeholder, onChange }) => {
  return (
    <SearchBarModal
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export { SearchBar };
