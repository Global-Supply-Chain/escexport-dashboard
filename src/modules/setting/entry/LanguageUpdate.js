import React, { useState } from "react";
import { countries, defaultLanguage, keys } from "../../../constants/config";
import { Dropdown } from "primereact/dropdown";
import { ChevronDownIcon } from "primereact/icons/chevrondown";
import { ChevronRightIcon } from "primereact/icons/chevronright";
import { setData } from "../../../helpers/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { updateLanguage } from "../settingSlice";

export const LanguageUpdate = () => {
  const [selectedLanguage, setLanguage] = useState(defaultLanguage);

  const dispatch = useDispatch();
  const { translate } = useSelector(state => state.setting);

  const onChangeLanguage = (e) => {
    setLanguage(e);
    setData(keys.LANGUAGE, e);
    dispatch(updateLanguage(e));
  }

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <img
            alt={option.name}
            src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
            className={`mr-2 flag flag-${option.code.toLowerCase()}`}
            style={{ width: "18px" }}
          />
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`mr-2 flag flag-${option.code.toLowerCase()}`}
          style={{ width: "18px" }}
        />
        <div>{option.name}</div>
      </div>
    );
  };

  const panelFooterTemplate = () => {
    return (
      <div className="py-2 px-3">
        {selectedLanguage ? (
          <span>
            <b>{selectedLanguage.name}</b> selected.
          </span>
        ) : (
          "No language selected."
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-column gap-2">
      <label htmlFor="name" className="text-black">
        {translate.change_language}
      </label>
      <Dropdown
        value={selectedLanguage}
        onChange={(e) => onChangeLanguage(e.value)}
        options={countries}
        optionLabel="name"
        placeholder="Select a Language"
        valueTemplate={selectedCountryTemplate}
        itemTemplate={countryOptionTemplate}
        panelFooterTemplate={panelFooterTemplate}
        dropdownIcon={(opts) => {
          return opts.iconProps["data-pr-overlay-visible"] ? (
            <ChevronRightIcon {...opts.iconProps} />
          ) : (
            <ChevronDownIcon {...opts.iconProps} />
          );
        }}
      />
    </div>
  );
};
