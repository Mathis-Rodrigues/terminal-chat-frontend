interface MessageProps {
  message: string;
  sender: string;
}

function Message(props: MessageProps) {
  const { message, sender } = props;
  return (
    <div style={{}}>
      <p className="font-vt323 text-xl text-primary">{`${sender}: ${message}`}</p>
    </div>
  );
}

export default Message;
