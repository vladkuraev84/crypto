/*interface IProps {
  className: string;
  classHeader: string;
  classTitleTxt: string;
  classMain: string;
  classBottom: string;
  header: boolean;
  titleTxt: boolean;
  main: boolean;
  bottomBlock: boolean;
}*/

export default {
  props: {
    className: {
      type: String,
      required: false,
    },
    classHeader: {
      type: String,
      required: false,
    },
    classTitleTxt: {
      type: String,
      required: false,
    },
    classMain: {
      type: String,
      required: false,
    },
    classBottom: {
      type: String,
      required: false,
    },
    header: {
      type: Boolean,
      default: true,
      required: false,
    },
    titleTxt: {
      type: Boolean,
      default: true,
      required: false,
    },
    main: {
      type: Boolean,
      default: true,
      required: false,
    },
    bottomBlock: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
};
