import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
};

const ChannelIdPage = async ({
  params
}: ChannelIdPageProps) => {

  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const { serverId, channelId } = params;

  const channel = await db.channel.findUnique({
    where: {
      id: channelId
    }
  });

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id
    }
  });

  if (!channel || !member) {
    return redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <div className="flex-1">
        Future messages
      </div>
      <ChatInput />
    </div>
  );
}

export default ChannelIdPage;