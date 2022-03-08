import Image from "next/image";

const AvatarIcon = (props) => {
  return (
    <Image
      src={props.src ? props.src : "/404Error.png"}
      alt={props.alt ? props.alt : "プロフィール画像"}
      width={props.width ? props.width : "100%"}
      height={props.height ? props.height : "100%"}
      layout={props.layout ? props.layout : "intrinsic"}
      objectFit={props.objectFit ? props.objectFit : "cover"}
    />
  );
};

export default AvatarIcon;
