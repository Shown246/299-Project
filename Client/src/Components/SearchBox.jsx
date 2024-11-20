import React from "react";
import Autosuggest from "react-autosuggest";

// Sample data
const languages = [
  {
    name: "Cat",
  },
  {
    name: "AC Servicing",
  },
  {
    name: "Ellipsis",
  },
  {
    name: "Fall",
  },
  {
    name: "Fat",
  },
  {
    name: "Frog",
  },
  {
    name: "Hello World",
  },
];

// Filter suggestions based on user input
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : languages
        .filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        )
        .slice(0, 3); // Limit to 3 suggestions
};

// Get the suggestion's value
const getSuggestionValue = (suggestion) => suggestion.name;

// Render the suggestion
const renderSuggestion = (suggestion) => (
  <div className="py-2 px-4 cursor-pointer border rounded-lg  hover:bg-genoa">
    {suggestion.name}
  </div>
);

class SearchBox extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
    };
  }

  // Handle input changes
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
    this.props.onSearchChange(newValue);
  };

  // Fetch suggestions when the user types
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // Clear suggestions
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Find your service here...",
      value,
      onChange: this.onChange,
      className:
        "w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600",
    };

    // Theme for styling the Autosuggest component
    const theme = {
      container: "relative text-black",
      input:
        "w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
      suggestionsContainer:
        "absolute w-full bg-accent rounded-lg mt-1 shadow-lg z-10",
      suggestion: "cursor-pointer border-2 border-gray-700 rounded-lg",
      suggestionHighlighted: "bg-gray-100",
    };

    return (
      <div className="w-full max-w-md mx-auto">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={theme} // Apply the theme
        />
      </div>
    );
  }
}

export default SearchBox;
