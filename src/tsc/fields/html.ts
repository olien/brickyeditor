import {
  FieldFactory,
  getFieldElement,
  toggleFieldSelection,
  updateFieldProperty,
} from "src/fields/field";
import { bre } from "src/types/bre";
import { toggleHtmlTools } from "src/ui/htmlTools";
import { SelectionUtils } from "src/ui/SelectionUtils";
import { Selectors } from "src/ui/Selectors";

export type HtmlFieldData = bre.core.field.FieldData & {
  type: "html";
  html: string;
};

type HtmlFieldFactory = FieldFactory<HtmlFieldData>;

export const createHtmlField: HtmlFieldFactory = (props, data) => {
  const { $element, preview } = props;

  if (data.html) {
    $element.innerHTML = data.html;
  }

  const field: bre.core.field.Field<HtmlFieldData> = {
    type: "html",
    name: data.name,
    $field: $element,
    data,
    getElement: () => {
      const $copy = getFieldElement($element);
      $copy.removeAttribute(Selectors.attrContentEditable);
      return $copy;
    },
  };

  SelectionUtils.bindTextSelection($element, rect => {
    toggleHtmlTools(rect);
  });

  const updateHtmlProp = () => {
    const value = $element.innerHTML.trim();
    if ($element.innerHTML !== value) {
      field.$field.innerHTML = value;
      updateFieldProperty<HtmlFieldData>(field, "html", value, true);
    }
  };

  if (!preview) {
    $element.setAttribute(Selectors.attrContentEditable, "true");

    $element.addEventListener("blur", updateHtmlProp);
    $element.addEventListener("keyup", updateHtmlProp);
    $element.addEventListener("paste", updateHtmlProp);
    $element.addEventListener("input", updateHtmlProp);

    $element.addEventListener("paste", ev => {
      ev.preventDefault();
      if (ev.clipboardData) {
        const text = ev.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
      }
    });

    $element.addEventListener("click", ev => {
      // Prevents the event from bubbling up the DOM tree
      toggleFieldSelection(field, true);
      ev.stopPropagation();
      return false;
    });
  }

  return field;
};
