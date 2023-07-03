import { useState, useEffect } from "react";
const useSelectionText = (ref) => {
  // to store the selected text and tools
  const [data, setData] = useState({
    showTools: false
  });

  //handle the mouseup event;
  const onMouseUp = () => {
    //get the window selection
    const selection = window.getSelection();

    // get the parent node
    const startNode = selection.getRangeAt(0).startContainer.parentNode;

    // get the end node;
    const endNode = selection.getRangeAt(0).endContainer.parentNode;

    // if the current element is not part of the selection node
    // do not show tools

    if (!startNode.isSameNode(ref.current) || !startNode.isSameNode(endNode)) {
      setData({
        showTools: false
      });
      return;
    }

    // get the cordinates of the selection
    const { x, y, width } = selection.getRangeAt(0).getBoundingClientRect();

    //if not much is selected // do not show tools

    if (!width) {
      setData({
        showTools: false
      });
      return false;
    }

    //if text is selected update the selection and the co-ordinates
    // the y position is adjusted to show bar above the selection
    if (selection.toString()) {
      setData({
        x: x,
        y: y + window.scrollY - 25,
        showTools: true,
        selectedText: selection.toString(),
        width
      });
    }
  };

  //handle the selection on mouseup event
  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);

    // remove the event listener
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  //returning data from the hook
  return data;
};
export default useSelectionText;
