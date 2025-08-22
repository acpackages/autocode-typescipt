import { ClassicPreset, GetSchemes, NodeEditor } from 'rete';
import { AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import { ConnectionPlugin,ClassicFlow} from 'rete-connection-plugin';
import { ContextMenuPlugin,Presets as ContextMenuPresets } from "rete-context-menu-plugin";

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = AngularArea2D<Schemes>;

export class AcNodeflowReteApi{
  areaPlugin:AreaPlugin<Schemes, AreaExtra>;
  connectionPlugin:ConnectionPlugin<Schemes, AreaExtra>;
  contextMenuPlugin:any = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([])
  });
  editor: NodeEditor<Schemes>;


}
