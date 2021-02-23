#[macro_use]
extern crate lazy_static;

use core_model::CocoConfig;
use plugin_interface::PluginInterface;

pub mod cmd_ctags;
pub mod coco_struct;
pub mod ctags_opt;
pub mod ctags_parser;

pub struct CocoStructAnalysis {}

impl PluginInterface for CocoStructAnalysis {
    fn name(&self) -> &'static str {
        "coco.struct_analysis"
    }

    fn on_plugin_load(&self) {
        // todo: check ctags install
    }

    fn on_plugin_unload(&self) {}

    fn execute(&self, config: CocoConfig) {
        println!("{:?}", config);
    }
}

impl Default for CocoStructAnalysis {
    fn default() -> Self {
        CocoStructAnalysis {}
    }
}

#[no_mangle]
pub fn plugin() -> Box<dyn PluginInterface> {
    Box::new(CocoStructAnalysis::default())
}
