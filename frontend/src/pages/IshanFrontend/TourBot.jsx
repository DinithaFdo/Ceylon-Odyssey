const TourBot = () => (
    <>
        <link rel="stylesheet" href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css" />
        <df-messenger
            project-id="ceylon-odessey"
            agent-id="9e7259fc-8f6d-40a8-9e43-45db7fb73c72"
            language-code="en"
            max-query-length="-1">
            <df-messenger-chat-bubble chat-title="Tour Package Bot"></df-messenger-chat-bubble>
        </df-messenger>
        <style>{`
            df-messenger {
                z-index: 999;
                position: fixed;
                --df-messenger-font-color: #000;
                --df-messenger-font-family: Google Sans;
                --df-messenger-chat-background: #f3f6fc;
                --df-messenger-message-user-background: #d3e3fd;
                --df-messenger-message-bot-background: #fff;
                bottom: 16px;
                right: 16px;
                --df-messenger-chat-bubble-background: #a8c7fa;
            }
        `}</style>
    </>
);
export default TourBot;