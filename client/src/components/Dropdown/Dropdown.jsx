import { useEffect, useRef, useState } from "react";
import { MdDone, MdClose, MdExpandMore, MdExpandLess } from "react-icons/md";

function Dropdown({ options, placeholder, onChange, selected = [] }) {
  const [selectOptions, setSelectOptions] = useState(options);
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const updateOption = (selectOpt, selectedValue) => {
    const newSelectOptions = selectOptions.filter(
      (o) => o.value !== selectOpt.value
    );
    const newOpt = { ...selectOpt };
    newOpt.selected = selectedValue;
    newSelectOptions.push(newOpt);
    setSelectOptions(newSelectOptions);
  };

  const optionSelected = (opt) =>
    selectOptions.findIndex(
      (s) => s.value === opt.value && s.selected === true
    ) > -1
      ? true
      : false;

  const onSelect = (_event, select) => {
    if (!optionSelected(select)) {
      updateOption(select, true);
      if (onChange) {
        onChange([...selected, select]);
      }
    }
  };

  const onRemove = (event, select) => {
    event.stopPropagation();
    updateOption(select, false);
    const filtered = selected.filter((s) => s.value !== select.value);
    if (onChange) {
      onChange(filtered);
    }
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center h-full mx-auto" ref={ref}>
      <div className="inline-block relative w-full">
        <div className="flex flex-col items-center relative">
          <div className="w-full" onClick={() => setShow(!show)}>
            <div className="my-2 p-1 flex border border-gray-200 bg-white rounded">
              <div className="flex flex-auto flex-wrap">
                {selected.map((option) => (
                  <div
                    key={option.value}
                    className="flex justify-center items-center m-1 font-medium py-1 px-1 rounded bg-gray-100 border"
                  >
                    <div className="text-xs font-normal leading-none max-w-full flex-initial">
                      {option.text}
                    </div>
                    <div className="flex flex-auto flex-row-reverse">
                      <div onClick={(e) => onRemove(e, option)}>
                        <MdClose className="cursor-pointer" />
                      </div>
                    </div>
                  </div>
                ))}

                {selected.length === 0 && (
                  <div className="flex-1">
                    <input
                      placeholder={placeholder}
                      className="bg-transparent p-1 px-2 appearance-none cursor-pointer outline-none h-full w-full text-gray-800"
                    />
                  </div>
                )}
              </div>
              <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
                {show && (
                  <button
                    type="button"
                    onClick={() => setShow(true)}
                    className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                  >
                    <MdExpandLess size={20} />
                  </button>
                )}
                {!show && (
                  <button
                    type="button"
                    onClick={() => setShow(false)}
                    className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                  >
                    <MdExpandMore size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-4">
          {show && (
            <div className="absolute shadow top-100 bg-white z-40 w-full left-0 rounded">
              <div className="flex flex-col w-full overflow-y-auto ">
                <div className="overflow-auto">
                  {selectOptions.map((option) => (
                    <div
                      key={option.value}
                      className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-gray-100"
                      onClick={(e) => onSelect(e, option)}
                    >
                      <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
                        <div className="w-full items-center flex justify-between">
                          <div className="mx-2 leading-6">{option.text}</div>
                          {option.selected && <MdDone />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
