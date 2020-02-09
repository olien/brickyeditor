import { helpers } from "src/helpers";
import { EditorsStyles } from "src/fields/editors.scss";

type InputParams = {
  title?: string;
  placeholder?: string;
};

type InputTypeParams =
  | {
      type: "text";
      value?: string;
      onUpdate: (value: string) => void;
    }
  | {
      type: "file";
      value?: string;
      uploadUrl?: string;
      onUpdate: (file: File, content: string) => void;
    };

type InputParamsWithType = InputParams & InputTypeParams;

const renderLabel = (
  $root: HTMLElement,
  $input: HTMLElement,
  { title }: InputParams
) => {
  if (title !== undefined) {
    const $label = helpers.el<HTMLLabelElement, EditorsStyles>({
      tag: "label",
      className: "bre-field-editor-label",
      innerHTML: title,
      props: {
        onclick: () => $input.focus()
      }
    });

    $root.append($label);
  }
};

export const renderInput = (props: InputParamsWithType) => {
  const { type, placeholder } = props;

  const $root = helpers.div<EditorsStyles>("bre-field-editor-prop");

  const $input = helpers.el<HTMLInputElement, EditorsStyles>({
    tag: "input",
    className: "bre-field-editor-input",
    props: {
      type,
      placeholder: placeholder || ""
    }
  });

  if (props.type === "text") {
    const updateValue = () => {
      props.onUpdate($input.value);
    };

    $input.value = props.value || "";
    $input.onchange = updateValue;
    $input.onkeyup = updateValue;
    $input.onpaste = updateValue;
  } else if ((props.type = "file")) {
    $input.onchange = async () => {
      const files = $input.files;
      const file = files === null ? null : files[0];

      if (file !== null) {
        const content = await helpers.readFileAsync(file);
        props.onUpdate(file, content);
      }
    };
  }

  renderLabel($root, $input, props);

  $root.append($input);
  return $root;
};

type InputSelectParams = InputParams & {
  value?: string;
  options: { value: string; label?: string }[];
  onUpdate: (value: string) => void;
};

export const renderSelect = (props: InputSelectParams) => {
  const { placeholder, value, options, onUpdate } = props;

  const $root = helpers.div<EditorsStyles>("bre-field-editor-prop");

  const $select = helpers.el<HTMLInputElement, EditorsStyles>({
    tag: "select",
    className: "bre-field-editor-input",
    props: {
      placeholder: placeholder || ""
    }
  });

  $select.onchange = () => onUpdate($select.value);

  $select.innerHTML = options
    .map(
      x =>
        `<option value="${x.value}" ${
          x.value === value ? "selected" : ""
        }>${x.label || x.value}</option>`
    )
    .join("\n");

  renderLabel($root, $select, props);

  $root.append($select);
  return $root;
};