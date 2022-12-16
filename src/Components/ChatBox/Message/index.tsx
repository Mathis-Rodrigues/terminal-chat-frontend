interface MessageProps {
  message: string;
  sender: string;
}

function Message(props: MessageProps) {
  const { message, sender } = props;
  return (
    <div style={{}}>
      <p className="text-primary text-xl font-vt323">{`${sender}: ${message}`}</p>
    </div>
  );
}

export default Message;
