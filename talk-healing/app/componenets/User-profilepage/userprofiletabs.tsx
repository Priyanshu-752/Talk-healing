import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CommentCard from "./commentcard";
import UserPost from "./userpost";

export default function UserProfileActivityTab({ }) {
    return(
<Tabs defaultValue="Posts" className="w-[400px]">
  <TabsList className="gap-5">
    <TabsTrigger value="Posts">Posts</TabsTrigger>
    <TabsTrigger value="Comments">Comments</TabsTrigger>
    <TabsTrigger value="Saves">Saves</TabsTrigger>
  </TabsList>
  <TabsContent value="Posts"><UserPost showHeader={false} /></TabsContent>
  <TabsContent className="flex flex-col gap-5" value="Comments">
    <CommentCard showHeader={false} />
  </TabsContent>
  <TabsContent value="Saves">No saves avaialable here.</TabsContent>
</Tabs>
    );
};